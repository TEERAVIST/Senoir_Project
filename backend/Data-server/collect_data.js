const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Path to the kdd99extractor.elf file
const kdd99extractorPath = './kdd99extractor';

// Run the kdd99extractor.elf file and collect the output just wifi card , if want to ethernet gotta 0
exec(`${kdd99extractorPath} -i 4 | head -n 1`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error running kdd99extractor.elf: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`Error in kdd99extractor.elf: ${stderr}`);
    return;
  }

  // Parse the output and create JSON data
  const output = stdout.trim(); // Remove trailing newline
  const features = [
    "duration", "protocol_type", "service", "flag", "src_bytes",
    "dst_bytes", "land", "wrong_fragment", "urgent",
    "count", "srv_count", "serror_rate", "srv_serror_rate",
    "rerror_rate", "srv_rerror_rate", "same_srv_rate", "diff_srv_rate", "srv_diff_host_rate",
    "dst_host_count", "dst_host_srv_count", "dst_host_same_srv_rate", "dst_host_diff_srv_rate",
    "dst_host_same_src_port_rate", "dst_host_srv_diff_host_rate", "dst_host_serror_rate",
    "dst_host_srv_serror_rate", "dst_host_rerror_rate", "dst_host_srv_rerror_rate"
  ];
  const outputValues = output.split(",");
  const jsonData = {};
  features.forEach((feature, index) => {
    jsonData[feature] = parseFloat(outputValues[index]) || outputValues[index];
  });

  // Update values for "protocol_type" with the corresponding values
  const protocolMapping = {'udp': 2, 'tcp': 1, 'icmp': 0};
  jsonData['protocol_type'] = protocolMapping[jsonData['protocol_type']];

  // Update values for "service" with the corresponding values
  const serviceMapping = {
    'other': 44, 'private': 49, 'http': 24, 'remote_job': 51, 'ftp_data': 20,
    'name': 36, 'netbios_ns': 38, 'eco_i': 14, 'mtp': 35, 'telnet': 60,
    'finger': 18, 'domain_u': 12, 'supdup': 58, 'uucp_path': 67, 'Z39_50': 2,
    'smtp': 54, 'csnet_ns': 7, 'uucp': 66, 'netbios_dgm': 37, 'urp_i': 65,
    'auth': 4, 'domain': 11, 'ftp': 19, 'bgp': 5, 'ldap': 32, 'ecr_i': 15,
    'gopher': 21, 'vmnet': 68, 'systat': 59, 'http_443': 26, 'efs': 16,
    'whois': 69, 'imap4': 28, 'iso_tsap': 29, 'echo': 13, 'klogin': 30,
    'link': 33, 'sunrpc': 57, 'login': 34, 'kshell': 31, 'sql_net': 55,
    'time': 63, 'hostnames': 23, 'exec': 17, 'ntp_u': 43, 'discard': 10,
    'nntp': 42, 'courier': 6, 'ctf': 8, 'ssh': 56, 'daytime': 9, 'shell': 53,
    'netstat': 40, 'pop_3': 47, 'nnsp': 41, 'IRC': 0, 'pop_2': 46,
    'printer': 48, 'tim_i': 62, 'pm_dump': 45, 'red_i': 50, 'netbios_ssn': 39,
    'rje': 52, 'X11': 1, 'urh_i': 64, 'http_8001': 27, 'aol': 3,
    'http_2784': 25, 'tftp_u': 61, 'harvest': 22
  };
  jsonData['service'] = serviceMapping[jsonData['service']];

  // Update values for "flag" with the corresponding values
  const flagMapping = {
    'SF': 9, 'S0': 5, 'REJ': 1, 'RSTR': 4, 'SH': 10,
    'RSTO': 2, 'S1': 6, 'RSTOS0': 3, 'S3': 8, 'S2': 7, 'OTH': 0
  };
  jsonData['flag'] = flagMapping[jsonData['flag']];

  // Write JSON data to the same file
  const outputPath = path.join(__dirname, 'input_data.json');
  fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2));

  console.log(`Data collected and stored in ${outputPath}`);
});

