


After deploying, let's verify again:
```bash
# Check Apache status
sudo systemctl status httpd

# Check if Apache is listening on 443
sudo ss -tlnp | grep ':443'

# Check Apache error logs
sudo cat /var/log/httpd/error_log
```
