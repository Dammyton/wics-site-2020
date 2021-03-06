import DateFnsUtils from "@date-io/date-fns";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { NextComponentType } from "next";
import { DefaultSeo } from "next-seo";
import { AppContext, AppInitialProps, AppProps } from "next/app";
import React, { useEffect } from "react";
import { SWRConfig } from "swr";
import ConfirmProvider from "../components/ConfirmProvider";
import LanguageProvider from "../components/LanguageProvider";
import ProgressBar from "../components/ProgressBar";
import SnackbarProvider from "../components/SnackbarProvider";
import ThemeProvider from "../components/ThemeProvider";
import AuthProvider from "../lib/auth";

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

const AppWrapper: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
    Component,
    pageProps
}: AppProps) => {
    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles && jssStyles.parentElement) {
            jssStyles.parentElement.removeChild(jssStyles);
        }

        if (process.env.NODE_ENV === "production") {
            // eslint-disable-next-line no-console
            console.log(
                `%c
██╗░░░██╗███╗░░░███╗░██╗░░░░░░░██╗██╗░█████╗░░██████╗
██║░░░██║████╗░████║░██║░░██╗░░██║██║██╔══██╗██╔════╝
██║░░░██║██╔████╔██║░╚██╗████╗██╔╝██║██║░░╚═╝╚█████╗░
██║░░░██║██║╚██╔╝██║░░████╔═████║░██║██║░░██╗░╚═══██╗
╚██████╔╝██║░╚═╝░██║░░╚██╔╝░╚██╔╝░██║╚█████╔╝██████╔╝
░╚═════╝░╚═╝░░░░░╚═╝░░░╚═╝░░░╚═╝░░╚═╝░╚════╝░╚═════╝░ 
    `,
                "font-family:monospace;color:#1976d2;font-size:12px;"
            );
        }
    }, []);

    return (
        <React.Fragment>
            <DefaultSeo
                titleTemplate={`%s | ${process.env.siteDisplayName}`}
                title={process.env.siteDisplayName}
                description={process.env.description}
                openGraph={{
                    title: process.env.siteDisplayName,
                    type: "website",
                    locale: process.env.locale,
                    site_name: process.env.siteName,
                    images: [
                        {
                            url: process.env.url + "/img/umwics-logo.png"
                        }
                    ]
                }}
            />
            <SWRConfig
                value={{
                    fetcher: (input: RequestInfo, init?: RequestInit) =>
                        fetch(input, init).then(res => res.json())
                }}
            >
                <LanguageProvider>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <ThemeProvider>
                            <SnackbarProvider>
                                <ConfirmProvider>
                                    <AuthProvider>
                                        <ProgressBar
                                            options={{ showSpinner: false, trickleSpeed: 300 }}
                                        />
                                        <Component {...pageProps} />
                                    </AuthProvider>
                                </ConfirmProvider>
                            </SnackbarProvider>
                        </ThemeProvider>
                    </MuiPickersUtilsProvider>
                </LanguageProvider>
            </SWRConfig>
        </React.Fragment>
    );
};

export default AppWrapper;
