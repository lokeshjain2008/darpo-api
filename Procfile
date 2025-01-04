web: npm run start:prod

# darpoUser: darpo_db_username_password (RDS)



# Step 3: Use .ebextensions for Custom Commands
# Create .ebextensions Directory: Create a directory named .ebextensions in the root of your project.

# Create a Configuration File: Create a configuration file named 01_run_migrations.config inside the .ebextensions directory.

# Explanation
# container_commands: This section allows you to run commands inside the application container during deployment.
# leader_only: Ensures that the migration command is run only once by the leader instance in a multi-instance environment.

eb create production-env \
    --cfg initial-config \
    --envvars RDS_PORT=5432,\
              RDS_DB_NAME=myappdb,\
              RDS_USERNAME=your_username,\
              RDS_PASSWORD=your_password
