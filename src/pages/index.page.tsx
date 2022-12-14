import type { CustomNextPage } from "next";
import dynamic from "next/dynamic";
import { Layout } from "src/layout";

// chrome APIを使用するためdynamic importし、browser側でのみ読み込まれるようにする
const Panel = dynamic(
  async () => {
    const module = await import("src/components/Panel");
    return module.Panel;
  },
  {
    ssr: false,
    loading: () => {
      return <div className="w-10 h-4 bg-gray-100 rounded border animate-pulse"></div>;
    },
  },
);

const IndexPage: CustomNextPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold whitespace-nowrap">Wishlist souveraine</h1>
      <Panel />
    </div>
  );
};

export default IndexPage;

IndexPage.getLayout = Layout;
