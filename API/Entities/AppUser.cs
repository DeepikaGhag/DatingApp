namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] HashPwd { get; set; }
        public byte[] SaltPwd { get; set; }
    }
}