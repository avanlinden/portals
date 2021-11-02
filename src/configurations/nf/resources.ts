export const datasetsSql = 'SELECT * FROM syn16859580'
export const publicationsSql = 'SELECT * FROM syn16857542'
export const studiesSql = 'SELECT * FROM syn16787123'
export const initiativesSql = 'SELECT * FROM syn24189696'
export const toolsSql = 'SELECT * FROM syn26345844'
export const peopleSql = 'SELECT * FROM syn23564971'
export const filesSql = `SELECT id AS "File ID", assay, dataType, diagnosis, tumorType,  species, individualID,  fileFormat, dataSubtype, nf1Genotype as "NF1 Genotype", nf2Genotype as "NF2 Genotype", studyName, fundingAgency, consortium, name AS "File Name", accessType, accessTeam  FROM syn16858331.8 WHERE resourceType = 'experimentalData'`
export const metadataFilesSql = `SELECT id, dataType, assay, diagnosis, tumorType, species, individualID, fileFormat, dataSubtype, nf1Genotype, nf2Genotype, fundingAgency, consortium FROM syn16858331.8 where resourceType ='report'`
export const fundersSql = 'SELECT * FROM syn16858699'
export const hackathonsSql = 'SELECT * FROM syn25585549'
export const observationsSql = 'SELECT "Observation Submitter Name" as "submitterName", Synapse_id as "submitterUserId", "Observation Time" as "time", "Observation Time Units" as "timeUnits", "Observation Text" as "text", "Observation Type" as "tag" FROM syn26344832 '
export const investigatorSql = `SELECT investigatorName as "firstName", ' ' as "lastName", institution, investigatorSynapseId as "USERID" FROM syn26433620 WHERE (investigatorSynapseId <> 'NaN' OR investigatorName <> 'NaN')`
export const developmentPublicationSql = `SELECT doi as "Development Publication" FROM syn26433434`
export const publicationCitationSql = `SELECT citation as "Publication Citation" FROM syn26433434`
export const fundingAgencySql = `SELECT funderName as "Funding Agency" FROM syn26433629`
export const usageRequirementsSql = `SELECT usageRequirements as "Usage Restrictions" FROM syn26433426 WHERE usageRequirements IS NOT NULL`
export const vendorSql = `SELECT vendorName as "Vendor", vendorUrl as "Vendor Url" FROM syn26433429 WHERE vendorName IS NOT NULL`
export const catalogNumberSql = `SELECT catalogNumber as "Catalog Number", catalogNumberURL as "Catalog Number URL" FROM syn26433429 WHERE catalogNumber IS NOT NULL`
export const mtaRequiredSql = `SELECT mTARequired as "MTA Requirements" FROM syn26433426 WHERE mTARequired IS NOT NULL`
export const toolApplicationsSql = `SELECT applications as "Tool Applications" FROM syn26433391 WHERE applications IS NOT NULL`
export const mutationsSql = 'SELECT resourceName, resourceType, externalMutationID, alleleType, mutationType, mutationMethod, affectedGeneSymbol, affectedGeneName, sequenceVariation, proteinVariation, animalModelMutation, humanClinVarMutation, chromosome FROM syn26433432'
