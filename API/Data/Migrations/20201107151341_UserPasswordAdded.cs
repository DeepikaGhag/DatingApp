using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class UserPasswordAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "HashPwd",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "SaltPwd",
                table: "Users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HashPwd",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "SaltPwd",
                table: "Users");
        }
    }
}
