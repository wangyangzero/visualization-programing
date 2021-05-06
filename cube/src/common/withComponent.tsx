import React from 'react';

export const WithComponent = (Component: any, props: any, key: string, index: number): any => {
  return (
  <section key = {key}>
    <Component {...props} index={index}/>
  </section>)
}
