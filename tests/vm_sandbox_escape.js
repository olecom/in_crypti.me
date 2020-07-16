con.log('must be `process.env` if not secured:');
con.log(con.constructor.constructor('return this.process.env')());
con.log(this.constructor.constructor('return this.process.env')());
con.log('\n*****\n');
