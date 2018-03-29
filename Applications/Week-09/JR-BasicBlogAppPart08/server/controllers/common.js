const fs = require('fs');

class Common {
  static resultOk( res, obj ) {
    if ( typeof obj === 'string' || obj === null || obj === undefined ) {
      res.json( { message: obj ? obj : 'ok' } );
    } else {
      res.json( { data: obj } );
    }
  }
  static resultErr( res, obj ) {
    let payload = {};
    if ( typeof obj === 'string' || obj === null || obj === undefined ) {
      payload = { message: obj ? obj : 'error' };
    } else {
      payload = { error: obj };
    }
    res.status( 500 )
      .json( payload );
  }
  static resultNotFound( res, msg ) {
    res.status( 404 )
      .json( { message: msg ? msg : 'Not Found' } );
  }
  static userAlreadyExists( res ) {
    console.log('adding to log...');
    Common.addToLog(`Attempted duplicate, email: ${email}`);

    res.status( 403 )
      .json( { message: 'User already exists.' } );
  }

  static userNotAuthorized( res ) {
    res.status( 403 )
      .json( { message: 'You are not logged in.' } );
  }
  static addToLog ( logContent ) {
    // get todays date
    
    const date = new Date();
    const month = date.getMonth(date) < 10 ? "0" + toString(date.getMonth(date)) : toString(date.getMonth(date));
    const day = date.getDate(date) < 10 ? "0" + toString(date.getDate(date)) : toString(date.getDate(date));
    const fileName = month + day + "log.txt";
    const wstream = fs.createWriteStream(`./logs/${filename}`);
    const log = `${month}/${day} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}` + String(logContent) + '/n' 
    wstream.on('finish', () => { console.log('Writing log, ', log); });
    wstream.write(log);
    wstream.end();
    console.log('Writing log, ', log);
    
    // TODO: upload file

    // TODO: delete file locally
  }
}

module.exports = Common;
