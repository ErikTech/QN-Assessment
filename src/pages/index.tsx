import type { NextPage } from "next";
import Head from "next/head";

import { getTrendingCollections } from "../redux/trendingCollectionsSlice";
import { wrapper } from "../redux/store";
import TrendingCollections from "../components/TrendingCollections";
import WalletConnect from "../components/WalletConnect";
import { useTrendingCollections } from "../util/hooks";

const IndexPage: NextPage = (props: any) => {
  const trendingCollections = useTrendingCollections(props.trendingCollections); // custom hook

  return (
    <div>
      <Head>
        <title>QN Assessment</title>
      </Head>
      <main className="">
        <div className="container mx-auto flex w-full flex-1 flex-col items-center justify-center px-20">
          <h1 className="text-3xl font-bold underline">QN Assessment</h1>
          <h2>Erik Lopez</h2>
          <WalletConnect />
          <TrendingCollections trendingCollections={trendingCollections.edges} />
        </div>
      </main>

    </div>
  );
};

// called during SSR, for some 
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const result = await store.dispatch(await getTrendingCollections());
    return {
      props: { trendingCollections: result.payload.data.trendingCollections },
    };
  }
);

export default IndexPage;
