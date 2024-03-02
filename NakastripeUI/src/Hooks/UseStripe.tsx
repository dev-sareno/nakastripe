import React, { createContext, useContext, useEffect, useState } from 'react';
import { Stripe, loadStripe } from '@stripe/stripe-js';

interface IStripeContext {
  stripe?: Stripe;
  ready: boolean;
}

const StripeContext = createContext<IStripeContext>({
  ready: false,
});

export const StripeProvider = (props: { children?: React.ReactNode }) => {
  const [stripe, setStripe] = useState<Stripe | undefined>();

  useEffect(() => {
    (async () => {
      const stripe = await loadStripe('pk_test_51OoRsHGiuMdAZZpVpWNBWgvFhC9zudSnrHt8vzzmm3blFPDCspdCrDVMlL1niWbenE0jQbAYqWceVo176f1JFMNL004fEFOeh5');
      if (stripe) {
        setStripe(stripe);
        console.log('Stripe has been initialized');
      } else {
        console.error('Failed to initialize Stripe');
      }
    })();
  }, []);

  return (
    <StripeContext.Provider value={{
      stripe: stripe,
      ready: stripe ? true : false,
    }}>
      {props.children}
    </StripeContext.Provider>
  );
};

export const useStripe = () => {
  return useContext(StripeContext);
};
