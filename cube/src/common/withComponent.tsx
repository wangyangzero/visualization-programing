import React from 'react';

export const withComponent = (Component: any, props: any, key: string): any => {
  console.log(Component)
  return (
  <section key = {key}>
    <Component {...props}/>
  </section>)
}
