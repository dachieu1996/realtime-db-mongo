using Microsoft.EntityFrameworkCore.Migrations;

namespace Tsoft.ChatService.Migrations
{
    public partial class UpdateDataUserContext : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ID",
                table: "tlbRolePermisson",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "tblUserRole",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "tblUser",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "tblRole",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "tblPermission",
                newName: "Id");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "tblUser",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "VerificationCode",
                table: "tblUser",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "VerificationCode",
                table: "tblUser");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "tlbRolePermisson",
                newName: "ID");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "tblUserRole",
                newName: "ID");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "tblUser",
                newName: "ID");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "tblRole",
                newName: "ID");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "tblPermission",
                newName: "ID");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "tblUser",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }
    }
}
