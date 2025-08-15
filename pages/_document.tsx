import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

export default class MyDocument extends Document<{ locale?: string }> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, locale: ctx.locale || 'de' };
  }

  render() {
    const locale = this.props.locale || 'de';
    return (
      <Html lang={locale}>
        <Head />
        <body className="bg-base">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}