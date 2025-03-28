module.exports = {

  ran_no : function ( min, max ){
    return Math.floor( Math.random() * ( max - min + 1 )) + min;
  },

  uid : function ( len ){
    var str     = '';
    var src     = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var src_len = src.length;
    var i       = len;

    for( ; i-- ; ){
      str += src.charAt( this.ran_no( 0, src_len - 1 ));
    }

    return str;
  },

  forbidden : function ( res ){
    var body       = 'Forbidden';
    res.statusCode = 403;

    res.setHeader( 'Content-Type', 'text/plain' );
    res.setHeader( 'Content-Length',   body.length );
    res.end( body );

  },

  vulnerableEval: function (input) {
    // ⚠️ This is a simulated vulnerability for testing purposes only
    eval(input); // Potential code injection vulnerability
  },

  runCommand: function (cmd) {
    // ⚠️ Simulated vulnerability: command injection
    const { exec } = require('child_process');
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }

  }
};
 
