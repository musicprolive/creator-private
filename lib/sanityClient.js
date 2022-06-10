import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: '3910c37t',
  dataset: 'production',
  apiVersion: '2022-03-02',
  token:
    'skiCV8kRr9Y31xPWfvmME1RGSyyzb1GXA0b4nnMvCtc7YxKuTsBSpWFlAFvRnYYeIMqSCWwTca3SLMBCAgjIPX4qnjuS6eRL6IiIWjW46SN5Ui3mN8qMiF1kQ1lmMfrLeUKjcmHGM9MCPgQMq8YfW92r4UWzmnfoepCohjDlDk3PB3GYM7zt',
  useCdn: false,
})

