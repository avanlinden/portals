import { HomeExploreConfig, SynapseConfig } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'
import facetAliases from '../facetAliases'
import { baseDataSqlColumns, baseDataSqlFrom, baseDataSqlWhere, allFacetsToPlot } from './uncategorized'

const rgbIndex = 0
// TODO: add testSentOn (when available):
// export const dataSql = `SELECT testSentOn, ${baseDataSqlColumns} ${baseDataSqlFrom} ${baseDataSqlWhere} 'Invited'`
export const dataSql = `SELECT ${baseDataSqlColumns} ${baseDataSqlFrom} ${baseDataSqlWhere} 'Invited'`
export const dataEntityId = 'syn22154087'
const entityId = dataEntityId
const sql = dataSql

export const invited: SynapseConfig = {
  name: 'QueryWrapperPlotNav',
  props: {
    rgbIndex,
    entityId,
    shouldDeepLink: true,
    sql,
    name: 'Invited Participants',
    facetAliases,
    tableConfiguration: {
    },
    facetsToPlot: allFacetsToPlot,
  },
}

export default invited
