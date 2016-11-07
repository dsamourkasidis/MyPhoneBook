namespace MyPhoneBook.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Adduserid : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.Contacts", name: "User_Id", newName: "UserId");
            RenameIndex(table: "dbo.Contacts", name: "IX_User_Id", newName: "IX_UserId");
        }
        
        public override void Down()
        {
            RenameIndex(table: "dbo.Contacts", name: "IX_UserId", newName: "IX_User_Id");
            RenameColumn(table: "dbo.Contacts", name: "UserId", newName: "User_Id");
        }
    }
}
