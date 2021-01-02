import React from 'react'
import ContentLoader from 'react-content-loader'

export const CatalogLoader: React.FC<any> = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={460}
    viewBox='0 0 280 460'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    {...props}
  >
    <rect x='0' y='264' rx='6' ry='6' width='280' height='20' />
    <rect x='0' y='302' rx='6' ry='6' width='280' height='84' />
    <rect x='17' y='410' rx='6' ry='6' width='82' height='32' />
    <rect x='112' y='395' rx='20' ry='20' width='163' height='54' />
    <circle cx='150' cy='130' r='120' />
  </ContentLoader>
)
