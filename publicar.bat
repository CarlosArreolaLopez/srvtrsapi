 rem nano /etc/apache2/sites-available/srvapicob.jkarreola.com.mx.conf
 rem nano /etc/apache2/sites-available/cobranza.jkarreola.com.mx.conf
 rem chown -R $USER:$USER /var/www/cobranza.jkarreola.com.mx/srvcobapi

 rem pm2 start server.js --name "srvcobapi"
 rem pm2 start server.js --name "srvcobapi.jkarreola.com.mx" --watch --port 80
 rem pm2 startup
 rem pm2 save
 rem pm2 monit
 rem pm2 logs
 scp -r *.* root@cobranza.jkarreola.com.mx:/var/www/transportestejeda.jkarreola.com.mx/srv