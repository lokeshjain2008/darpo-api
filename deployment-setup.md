After merging the deployment configurations, let's set up the necessary secrets and test the deployment. Here's what we need to do:

1. First, let's set up GitHub Secrets for AWS:
   - Go to darpo-api repository settings
   - Go to Secrets and Variables → Actions
   - Add these secrets:
     ```
     AWS_ACCESS_KEY_ID
     AWS_SECRET_ACCESS_KEY
     ```

2. Create Kubernetes secrets in the dev environment:
```bash
# First, get the RDS endpoint from terraform output
cd darpo-infra/terraform/environments/dev
terraform output rds_endpoint

# Create the secret in Kubernetes
kubectl create secret generic app-secrets \
  --namespace darpo-dev \
  --from-literal=DATABASE_URL="postgresql://[username]:[password]@[rds-endpoint]:5432/darpo"
```

3. Verify all prerequisites:
```bash
# Verify EKS cluster
kubectl get nodes

# Verify namespace
kubectl get ns darpo-dev

# Check ECR repository
aws ecr describe-repositories --repository-names darpo-api
```

Would you like me to:
1. Help with setting up the GitHub secrets?
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
DATABASE_URL="postgresql://[username]:[password]@[rds-endpoint]:5432/darpo"

# Kubectl configuration 

Yes, you're absolutely right! Let's configure kubectl to connect to our EKS cluster.

1. First, let's update our kubeconfig using AWS CLI:
```bash
# Update kubeconfig for our cluster
aws eks update-kubeconfig \
    --name darpo-dev \
    --region ap-south-1
```

2. Verify the connection:
```bash
# Check if we can connect to the cluster
kubectl get nodes

# Check the current context
kubectl config current-context

# List all namespaces
kubectl get ns
```

3. Verify we can see our namespace:
```bash
kubectl get ns darpo-dev
```

Once we confirm we have the correct connection, we can proceed with:
1. Creating the Kubernetes secrets with RDS credentials
2. Testing a deployment
3. Setting up monitoring

Which would you like to do next?
