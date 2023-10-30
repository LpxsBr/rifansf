import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head content='
                <meta name="adopt-website-id" content="dd2b0e29-db4a-44a3-8dd9-278bfa7759ff" />
                <script src="//tag.goadopt.io/injector.js?website_code=dd2b0e29-db4a-44a3-8dd9-278bfa7759ff"
                className="adopt-injector" />'/>

            <Head>

                <meta name="adopt-website-id" content="dd2b0e29-db4a-44a3-8dd9-278bfa7759ff" />
                <script src="//tag.goadopt.io/injector.js?website_code=dd2b0e29-db4a-44a3-8dd9-278bfa7759ff"
                    className="adopt-injector" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}