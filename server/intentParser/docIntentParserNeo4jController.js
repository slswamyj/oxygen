const neo4jDriver = require('neo4j-driver').v1;

const logger = require('./../../applogger');

const config = require('./../../config');

let driver = neo4jDriver.driver(config.NEO4J_BOLT_URL,
  neo4jDriver.auth.basic(config.NEO4J_USR, config.NEO4J_PWD),{encrypted:false}
  );

let fetchIndicatorTerms = function(data) {
  let promise = new Promise(function(resolve, reject) {

    logger.debug("Now proceeding to fetchIndicatorTerms: ", data);

    let indicatorTerm=[];

    let session = driver.session();

    logger.debug("obtained connection with neo4j");

    let query='MATCH (i:intent{name:{intentName}}) ';
    query+='MATCH (t:term) ';
    query += 'MATCH (d:Domain{name:{domainName}})';
    query += 'MATCH (n)<-[r:indicatorOf]-(t) return t';

    let params = {
      domainName: data.domain,
      intentName: data.intent,
    };

    session.run(query, params)
    .then(function(result) {
      result.records.forEach(function(record) {
        logger.debug("Result from neo4j: ", record);
        indicatorTerm.push(record._fields[0].properties.name);
      });

        // Completed!
        session.close();
        data.indicatorTerms=indicatorTerm;
        resolve(data);
      })
    .catch(function(err) {
      logger.error("Error in neo4j query: ", err, ' query is: ',
        query);
      reject(err);
    });
  });

  return promise;
}

let fetchCounterIndicatorTerms = function(data) {
  let promise = new Promise(function(resolve, reject) {

    logger.debug("Now proceeding to fetch Counter Indicator Terms: ", newDomainObj);

    let session = driver.session();

    let counterIndicatorTerm=[];

    logger.debug("obtained connection with neo4j");

    let query='MATCH (i:intent{name:{intentName}}) ';
    query+='MATCH (t:term) ';
    query += 'MATCH (d:Domain{name:{domainName}})';
    query += 'MATCH (n)<-[r:counterIndicatorOf]-(t) return t';

    let params = {
      domainName: data.domain,
      intentName: data.intent,
    };

    session.run(query, params)
    .then(function(result) {
      result.records.forEach(function(record) {
        logger.debug("Result from neo4j: ", record);
        counterIndicatorTerm.push(record._fields[0].properties.name);
      });

        // Completed!
        session.close();
        data.counterIndicatorTerms=counterIndicatorTerm;
        resolve(data);
      })
    .catch(function(err) {
      logger.error("Error in neo4j query: ", err, ' query is: ',
        query);
      reject(err);
    });
  });

  return promise;
}

let addIntentRelationship = function(data) {
  let promise = new Promise(function(resolve, reject) {


    if(data.intentDensity<=0)
    {
    resolve(data);
    }

    else {


    logger.debug("Now proceeding to add intent as relationship b/w concept and doc ", newDomainObj);

    let session = driver.session();

    let counterIndicatorTerm=[];

    logger.debug("obtained connection with neo4j");

    let query='MATCH (w:webDocument{name:{documentUrl}}) ';
    query+='MATCH (c:concept{name:{conceptName}}) ';
    query += 'MATCH (d:Domain{name:{domainName}})';
    query += 'MERGE (c)<-[r:{intentName}]-(w) SET r.intensity={intensity}';

    let params = {
      domainName: data.domain,
      intentName: data.intent,
      conceptName: data.concept,
      documentUrl: data.url,
      intensity: data.intensity
    };

    session.run(query, params)
    .then(function(result) {
      result.records.forEach(function(record) {
        logger.debug("Result from neo4j: ", record);
        counterIndicatorTerm.push(record._fields[0].properties.name);
      });

        // Completed!
        session.close();
        resolve(data);
      }
      )
    .catch(function(err) {
      logger.error("Error in neo4j query: ", err, ' query is: ',
        query);
      reject(err);
    });

  }
  });

  return promise;
}



module.exports = {
  fetchIndicatorTerms: fetchIndicatorTerms,
  fetchCounterIndicatorTerms:fetchCounterIndicatorTerms,
  addIntentRelationship:addIntentRelationship
}