import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'

import { SynapseConstants } from 'synapse-react-client'
import { SynapseConfig } from 'types/portal-config'
import { facetAliases } from './commonProps'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { DetailsPageProps } from 'types/portal-util-types'

const datasetsSql = 'SELECT * FROM syn31543490'
export const datasetSchema: GenericCardSchema = {
  type: SynapseConstants.DATASET,
  title: 'name',
  subTitle: 'institutionOrPI', // custom annotation on datasets
  description: 'descriptionAnnotation', // until entity.description is supported, this also needs to be a custom annotation
  secondaryLabels: [
    'assay', 
    'currentVersion',
    'createdBy',
    'id'
  ],
}

export const datasetCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  titleLinkConfig: {
    isMarkdown: false,
    baseURL: 'Explore/DatasetsV2/DetailsPage',
    URLColumnName: 'id',
    matchColumnName: 'id',
  },
  secondaryLabelLimit: 4,
  genericCardSchema: datasetSchema,
}
const rgbIndex = 6
const datasetsV2: SynapseConfig = {
  name: 'QueryWrapperPlotNav',
  props: {
    rgbIndex,
    sql: datasetsSql,
    shouldDeepLink: true,
    name: 'Datasets',
    cardConfiguration: datasetCardConfiguration,
    facetAliases,
  },
}

export const datasetDetailsPageConfig: DetailsPageProps = {
  sql: datasetsSql,
  sqlOperator: '=',
  showMenu: false,

  synapseConfigArray: [
    {
      name: 'Markdown',
      props: {},
      injectMarkdown: false,
      columnName: 'id',
      title: 'Data Notes',
    },
    {
      name: 'QueryWrapperPlotNav',
      props: {
        sqlOperator: 'HAS',
        rgbIndex,
        name: 'Files',
        sql: '',
        visibleColumnCount: 7,
        tableConfiguration: {
          showAccessColumn: true,
          showDownloadColumn: true,
        },
        shouldDeepLink: false,
        facetAliases,
      },
      // tableSqlKeys: ['id'],  // Do not modify the sql where condition based on search params
      overrideSqlSourceTable: true, // Instead, modify the sql (SELECT * FROM <search_param_value>)
      columnName: 'id',
    },
  ],
}

export const datasetsDetailsPage: SynapseConfig[] = [
  {
    name: 'CardContainerLogic',
    isOutsideContainer: true,
    props: {
      sql: datasetsSql,
      type: SynapseConstants.GENERIC_CARD,
      genericCardSchema: datasetSchema,
      secondaryLabelLimit: 6,
      isHeader: true,
    },
  },
  {
    name: 'DetailsPage',
    props: datasetDetailsPageConfig,
    containerClassName: 'container-full-width',
  },
]

export default datasetsV2
