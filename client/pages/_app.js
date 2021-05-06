import 'bootstrap/dist/css/bootstrap.css'
import buildClient from '../api/build-client'
import Header from '../components/header'

const AppComponent = ({ Component, pageProps, currentUser  }) => {

    return <div>
            <Header currentUser = {currentUser}/>
            <Component {...pageProps} />
            </div>
}

AppComponent.getInitialProps = async (appContext) => {
    // called before every page - but then must manually call the page's get inital props

    const { data } = await buildClient(appContext.ctx).get('/api/users/currentuser')

    let pageProps = {}
    if(appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx)
    }
    
    console.log('App Init ', pageProps)
    return { pageProps, ...data }
}

export default AppComponent