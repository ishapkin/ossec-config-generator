/**
 * Plugin class
 */
export const plugin = {
    email_notification: 'yes',
    email_to: 'info@example.com',
    smtp_server: 'ssl://localhost',
    email_from: 'notify@ossec.com',
    email_maxperhour: 400,
    frequency: 800,
    directories: '/etc,/usr/bin,/usr/sbin,/boot,/opt,/lib,/lib64',
    ignore: '/etc/mtab',
    scan_time: '04:00',
    scan_on_start: 'yes',
    alert_new_files: 'yes',
    rootkit_files: '/var/ossec/etc/shared/rootkit_files.txt',
    rootkit_trojans: '/var/ossec/etc/shared/rootkit_trojans.txt',
    system_audit: 'system_audit_rcl.txt, cis_rhel_linux_rcl.txt, cis_rhel5_linux_rcl.txt',
    hostname: '192.168.2.32',
    username: 'db_user',
    password: 'db_password',
    database: 'db_name',
    type: 'mysql',
    server: 'localhost',
    port: 3360,
    format: 'default'
};

export const databaseTypes  = ['mysql', 'postgres', 'mongodb', 'elastic', 'other'];

