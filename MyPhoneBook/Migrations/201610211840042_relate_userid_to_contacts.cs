namespace MyPhoneBook.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class relate_userid_to_contacts : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Contacts", "LastName", c => c.String());
            DropColumn("dbo.Contacts", "LastNanme");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Contacts", "LastNanme", c => c.String());
            DropColumn("dbo.Contacts", "LastName");
        }
    }
}
