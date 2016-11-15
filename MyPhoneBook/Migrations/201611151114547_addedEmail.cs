namespace MyPhoneBook.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addedEmail : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Contacts", "Email", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Contacts", "Email");
        }
    }
}
