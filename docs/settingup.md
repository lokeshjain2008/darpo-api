# Setting up the ElasticBeanstalk was an challenge
## 1. setting up the ec2 instance, 
There is configuration issues with the setup.
- Root volume type - gp3 important
- IMDSv1 should be deactiated - important
- select the spot instance
- Public IP address - should be enabled

## 2. connect with the database
### permissions 
1. give the `aws-elasticbeanstalk-ec2-role` to the permissions for rds
Upadate the it in the IAM conssole.
2. Allow inbound request to the rds db instance.
In rds sercurity grops there are 2 SG rules
use SG named "rds-ec2-1" and give permssion to the EB SG.

- Edit inbound rules
- Add a new rule:
    Type: PostgreSQL (or Custom TCP)
    Port: 5432
    Source: Your Elastic Beanstalk security group ID
    Description: "Allow EB access"

To find EB SG - follow the added instance and see the list of added SG use one which has `ebs` in name.

3. verify if you eb is able to reach the database
`aws rds describe-db-instances --db-instance-identifier`

you can do the `nc` or `telnet` to ping the database endpoint

## 3. primsa to connect and migrations
1. Access to the evn variables.
node app need to read some env variables 
- JWT_KEY
- DATABASE_URL -(encode the url for special character)(maybe)
Define them in the `eb` config -> environment variables
2. Check `eb printenv`
3. Verify if these env vars are available
```sh
eb ssh <environment>
# On the EB instance after SSH
cd /var/app/current
sudo -u webapp printenv | grep DATABASE_URL
```
3. **Alert**
There is issue that env vars are there in 
`/opt/elasticbeanstalk/deployment/env` but not exported to the environment
**Solution** - check the .ebextentions/01_migration.config

Note: default database on rds postgress is `postgres`



