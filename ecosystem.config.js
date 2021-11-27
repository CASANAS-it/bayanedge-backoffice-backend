module.exports = {
  apps: [{
    name: 'bayanedge-backoffice-backend',
    script: 'index.js',
    watch: true,
    watch_delay: 4000,
    restart_delay: 4000,
    ignore_watch: ['node_modules', 'client/img']
  }]
}
