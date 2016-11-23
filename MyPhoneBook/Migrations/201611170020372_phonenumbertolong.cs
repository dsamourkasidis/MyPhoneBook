namespace MyPhoneBook.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class phonenumbertolong : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Contacts", "PhoneNumber", c => c.Long(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Contacts", "PhoneNumber", c => c.Int(nullable: false));
        }
    }
}
