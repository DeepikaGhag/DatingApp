using Microsoft.AspNetCore.Mvc;
using API.Data;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Text;
using API.DTOs;
using Microsoft.EntityFrameworkCore;
using API.Entities;
using System.Linq;
using API.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using API.Services;
using API.Interfaces;

namespace API.Controllers
{
    public class AccountController : BaseController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public AccountController(DataContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }
        
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO){
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == loginDTO.Username.ToLower());
            if(user == null){
                return Unauthorized("User does not exists");
            }
            using var hmac = new HMACSHA512(user.SaltPwd);
            var pwdHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));
            for (int i = 0; i < pwdHash.Length; i++)
            {
                if(user.HashPwd[i] != pwdHash[i]) return Unauthorized("Password is incorrect");
            }
            return new UserDTO{
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO register){
            if(UserExists(register.Username).Result)
            {
                return BadRequest("Username already exists");
            }
            using var hmac = new HMACSHA512();
            var user = new AppUser{
                UserName = register.Username.ToLower(),
                HashPwd = hmac.ComputeHash(Encoding.UTF8.GetBytes(register.Password)),
                SaltPwd = hmac.Key,
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            
            return new UserDTO{
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
 
        }

        private async Task<bool> UserExists(string username){
          return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}