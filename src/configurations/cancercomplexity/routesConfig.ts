import { GenericRoute } from 'types/portal-config'
import { publications, files, datasets, grants, tools } from './synapseConfigs'
import { projectCardConfiguration } from './synapseConfigs/projects'
import { datasetCardConfiguration } from './synapseConfigs/datasets'
import RouteControlWrapperProps from './routeControlWrapperProps'
import { toolsConfiguration } from './synapseConfigs/tools'
import DatasetSvg from './style/Dataset.svg'
import { publicationsCardConfiguration } from './synapseConfigs/publications'
import { grantsCardConfiguration } from './synapseConfigs/grants'
import { onPointClick } from './synapseConfigs/onPointClick'
import facetAliases from './facetAliases'
import {
  datasetsSql,
  filesSql,
  grantsSql,
  publicationSql,
  projectsSql,
  toolsSql,
} from './resources'

const routes: GenericRoute[] = [
  {
    to: '',
    isNested: false,
    synapseConfigArray: [
      {
        name: 'FunderCards',
        props: undefined,
        isOutsideContainer: true,
      },
      {
        name: 'ConsortiaGoals',
        title: 'Consortia Activity',
        centerTitle: true,
        outsideContainerClassName: 'home-spacer home-bg-dark',
        props: undefined,
      },
      {
        name: 'ThemesPlot',
        containerClassName: 'CSBC-ThemesPlot',
        title: 'What Research Themes are Scientists Currently Focusing On?',
        centerTitle: true,
        props: {
          onPointClick,
          topBarPlot: {
            entityId: 'syn21641485',
            xField: 'totalCount',
            yField: 'groupBy',
            groupField: 'consortium',
            colors: {
              CSBC: 'rgba(64,123,160, 1)',
              'PS-ON': 'rgba(91,176,181,1)',
              ICBP: 'rgba(197, 191, 223, 1)',
              TEC: 'rgba(156, 196, 233, 1)',
            },
            whereClause: 'totalCount is not NULL',
          },
          sideBarPlot: {
            entityId: 'syn21649281',
            xField: 'totalCount',
            yField: 'theme',
            groupField: 'consortium',
            countLabel: 'grants',
            plotStyle: {
              backgroundColor: '#f5f9fa',
            },
            colors: {
              CSBC: '#1c76af',
              'PS-ON': '#5bb0b5',
              ICBP: '#9cc4e9',
              TEC: '#c5bfdf',
            },
          },
          dotPlot: {
            entityId: 'syn21639584',
            xField: 'totalCount',
            yField: 'theme',
            groupField: 'groupBy',
            infoField: 'themeDescription',
            whereClause: "groupBy IN ('publications', 'tools', 'datasets')",
            markerSymbols: {
              tools: 'y-down',
              datasets: 'diamond-x',
              publications: 'circle',
            },
            plotStyle: {
              markerLine: 'rgba(0, 0, 0,1)',
              markerFill: 'rgba(255, 255, 255,1)',
              markerSize: 11,
              backgroundColor: '#f5f9fa',
            },
          },
        },
      },
      {
        name: 'Ecosystem',
        title: 'The Cancer Resource Information Ecosystem',
        centerTitle: true,
        subtitle:
          'The Cancer Resource Information ecosystem contains a growing list of tools and resources. Explore some of them below.',
        outsideContainerClassName: 'home-spacer home-bg-dark',
        props: {
          config: [
            {
              title: 'Public Repositories',
              ownerId: 'syn21498902',
              wikiId: '601489',
            },
            {
              title: 'Data Common Nodes',
              ownerId: 'syn21498902',
              wikiId: '601490',
            },
            {
              title: 'Data Coordination',
              ownerId: 'syn21498902',
              wikiId: '601574',
            },
            {
              title: 'Data Exploration',
              ownerId: 'syn21498902',
              wikiId: '601575',
            },
            {
              title: 'Cloud Platform',
              ownerId: 'syn21498902',
              wikiId: '601576',
            },
          ],
        },
      },
      {
        name: 'AboutPortal',
        title: 'About the Cancer Complexity Knowledge Portal',
        subtitle:
          'The portal is built to disseminate resources to accelerate discovery and collaboration in the cancer research community. We aim to provide rich context about and access to activities and contributors that have produced the resources hosted within this and other repositories.',
        centerTitle: true,
        props: {
          cardProps: [
            { ownerId: 'syn21498902', wikiId: '601369' },
            { ownerId: 'syn21498902', wikiId: '601370' },
          ],
        },
      },
      {
        name: 'DevelopedBySage',
        props: undefined,
      },
    ],
  },
  {
    to: 'Explore',
    isNested: true,
    routes: [
      {
        to: 'Grants',
        isNested: true,
        synapseConfigArray: [
          {
            name: 'RouteControlWrapper',
            isOutsideContainer: true,
            props: {
              ...RouteControlWrapperProps,
              synapseConfig: grants,
            },
          },
        ],
        routes: [
          {
            to: 'DetailsPage',
            isNested: false,
            synapseConfigArray: [
              {
                name: 'CardContainerLogic',
                isOutsideContainer: true,
                props: {
                  isHeader: true,
                  ...grantsCardConfiguration,
                  secondaryLabelLimit: Infinity,
                  sql: grantsSql,
                },
              },
              {
                name: 'DetailsPage',
                props: {
                  sql: `${grantsSql}`,
                  sqlOperator: 'LIKE',
                  synapseConfigArray: [
                    {
                      name: 'CardContainerLogic',
                      columnName: 'grantName',
                      title: 'Related Projects',
                      tableSqlKeys: ['grantName'],
                      props: {
                        sqlOperator: 'LIKE',
                        sql: `${projectsSql} where grantType LIKE '%U54%'`,
                        ...projectCardConfiguration,
                      },
                    },
                    {
                      name: 'CardContainerLogic',
                      columnName: 'grantName',
                      title: 'Related Publications',
                      tableSqlKeys: ['grantName'],
                      props: {
                        sqlOperator: 'LIKE',
                        sql: publicationSql,
                        ...publicationsCardConfiguration,
                        facetAliases,
                      },
                    },
                    {
                      name: 'CardContainerLogic',
                      columnName: 'grantName',
                      title: 'Related Datasets',
                      tableSqlKeys: ['grantName'],
                      props: {
                        sqlOperator: 'LIKE',
                        sql: datasetsSql,
                        ...datasetCardConfiguration,
                        facetAliases,
                      },
                    },
                    {
                      name: 'CardContainerLogic',
                      columnName: 'grantName',
                      title: 'Related Tools',
                      tableSqlKeys: ['grantName'],
                      props: {
                        sqlOperator: 'LIKE',
                        sql: toolsSql,
                        ...toolsConfiguration,
                        facetAliases,
                      },
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        to: 'Publications',
        isNested: true,
        synapseConfigArray: [
          {
            name: 'RouteControlWrapper',
            isOutsideContainer: true,
            props: {
              ...RouteControlWrapperProps,
              synapseConfig: publications,
            },
          },
        ],
        routes: [
          {
            to: 'DetailsPage',
            isNested: false,
            synapseConfigArray: [
              {
                name: 'CardContainerLogic',
                isOutsideContainer: true,
                props: {
                  isHeader: true,
                  ...publicationsCardConfiguration,
                  secondaryLabelLimit: Infinity,
                  facetAliases,
                  sql: publicationSql,
                },
              },
              {
                name: 'DetailsPage',
                props: {
                  sql: publicationSql,
                  sqlOperator: '=',
                  synapseConfigArray: [
                    {
                      name: 'CardContainerLogic',
                      columnName: 'pubMedId',
                      title: 'Related Datasets',
                      tableSqlKeys: ['pubMedId'],
                      props: {
                        sqlOperator: 'HAS',
                        sql: datasetsSql,
                        ...datasetCardConfiguration,
                        facetAliases,
                      },
                    },
                    {
                      name: 'CardContainerLogic',
                      columnName: 'pubMedId',
                      title: 'Related Tools',
                      tableSqlKeys: ['pubMedId'],
                      props: {
                        sqlOperator: '=',
                        sql: toolsSql,
                        ...toolsConfiguration,
                        facetAliases,
                      },
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        to: 'Datasets',
        isNested: true,
        synapseConfigArray: [
          {
            name: 'RouteControlWrapper',
            isOutsideContainer: true,
            props: {
              ...RouteControlWrapperProps,
              synapseConfig: datasets,
            },
          },
        ],
        routes: [
          {
            to: 'DetailsPage',
            isNested: false,
            synapseConfigArray: [
              {
                name: 'CardContainerLogic',
                isOutsideContainer: true,
                props: {
                  isHeader: true,
                  sqlOperator: '=',
                  ...datasetCardConfiguration,
                  secondaryLabelLimit: Infinity,
                  sql: datasetsSql,
                  iconOptions: {
                    dataset: DatasetSvg,
                  },
                  facetAliases,
                },
              },
              {
                name: 'DetailsPage',
                props: {
                  sql: datasetsSql,
                  sqlOperator: 'LIKE',
                  showMenu: false,
                  synapseConfigArray: [
                    {
                      name: 'StandaloneQueryWrapper',
                      title: 'Data',
                      columnName: 'datasetAlias',
                      tableSqlKeys: ['datasets'],
                      props: {
                        sql: filesSql,
                        sqlOperator: '=',
                        rgbIndex: 0,
                        title: 'Dataset Files',
                      },
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        to: 'Files',
        isNested: false,
        synapseConfigArray: [
          {
            name: 'RouteControlWrapper',
            isOutsideContainer: true,
            props: {
              ...RouteControlWrapperProps,
              synapseConfig: files,
            },
          },
        ],
      },
      {
        to: 'Tools',
        isNested: true,
        synapseConfigArray: [
          {
            name: 'RouteControlWrapper',
            isOutsideContainer: true,
            props: {
              ...RouteControlWrapperProps,
              synapseConfig: tools,
            },
          },
        ],
        routes: [
          {
            to: 'DetailsPage',
            isNested: false,
            synapseConfigArray: [
              {
                name: 'CardContainerLogic',
                isOutsideContainer: true,
                props: {
                  isHeader: true,
                  sqlOperator: '=',
                  ...toolsConfiguration,
                  secondaryLabelLimit: Infinity,
                  sql: toolsSql,
                  iconOptions: {
                    dataset: DatasetSvg,
                  },
                  facetAliases,
                },
              },
              {
                name: 'DetailsPage',
                props: {
                  sql: toolsSql,
                  sqlOperator: 'LIKE',
                  synapseConfigArray: [
                    {
                      name: 'CardContainerLogic',
                      columnName: 'grantName',
                      title: 'Related Grants',
                      tableSqlKeys: ['grantName'],
                      props: {
                        sqlOperator: 'LIKE',
                        sql: grantsSql,
                        ...grantsCardConfiguration,
                        facetAliases,
                      },
                    },
                    {
                      name: 'CardContainerLogic',
                      columnName: 'publicationTitle',
                      title: 'Related Publications',
                      tableSqlKeys: ['publicationTitle'],
                      props: {
                        sqlOperator: 'LIKE',
                        sql: publicationSql,
                        ...publicationsCardConfiguration,
                        facetAliases,
                      },
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    isNested: false,
    displayName: 'Help',
    to: undefined,
    target: '_blank',
    link: 'http://help.cancercomplexity.synapse.org/',
    synapseConfigArray: [],
  },
]

export default routes
