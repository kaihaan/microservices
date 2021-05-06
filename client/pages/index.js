import buildClient from '../api/build-client'

const Main = ({currentUser}) => {
//    console.log(currentUser)
    console.log('Landing page - currentUser ', currentUser)

    return currentUser ? <h1>Signed In </h1> :  <h1>Not Signed In </h1> 
    // return <h1>Signed In </h1>  
}

Main.getInitialProps = async (context) => {
    console.log('Landing page - get Init Props')
    const { data } = await buildClient(context).get('/api/users/currentuser')
    console.dir(data)
    return data
}

export default Main