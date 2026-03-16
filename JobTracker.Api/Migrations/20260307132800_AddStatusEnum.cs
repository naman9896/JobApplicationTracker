using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobTracker.Api.Migrations
{
    public partial class AddStatusEnum : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Rename old string column
            migrationBuilder.RenameColumn(
                name: "Status",
                table: "JobApplications",
                newName: "StatusOld");

            // Add new int column
            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "JobApplications",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            // Copy old string values into new enum-backed int values
            migrationBuilder.Sql(@"
                UPDATE ""JobApplications""
                SET ""Status"" = CASE
                    WHEN ""StatusOld"" = 'Applied' THEN 0
                    WHEN ""StatusOld"" = 'Interview Scheduled' THEN 1
                    WHEN ""StatusOld"" = 'InterviewScheduled' THEN 1
                    WHEN ""StatusOld"" = 'Rejected' THEN 2
                    WHEN ""StatusOld"" = 'Offer' THEN 3
                    ELSE 0
                END;
            ");

            // Remove old column
            migrationBuilder.DropColumn(
                name: "StatusOld",
                table: "JobApplications");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Recreate old string column
            migrationBuilder.AddColumn<string>(
                name: "StatusOld",
                table: "JobApplications",
                type: "text",
                nullable: false,
                defaultValue: "Applied");

            // Convert enum ints back to strings
            migrationBuilder.Sql(@"
                UPDATE ""JobApplications""
                SET ""StatusOld"" = CASE
                    WHEN ""Status"" = 0 THEN 'Applied'
                    WHEN ""Status"" = 1 THEN 'InterviewScheduled'
                    WHEN ""Status"" = 2 THEN 'Rejected'
                    WHEN ""Status"" = 3 THEN 'Offer'
                    ELSE 'Applied'
                END;
            ");

            // Drop int column
            migrationBuilder.DropColumn(
                name: "Status",
                table: "JobApplications");

            // Rename old string column back
            migrationBuilder.RenameColumn(
                name: "StatusOld",
                table: "JobApplications",
                newName: "Status");
        }
    }
}