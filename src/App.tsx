import { MainContainer } from '@/layout/mainContainer'
import { Route } from 'wouter'
import { ROUTES, Home, Randomizer, Options } from '@/routes'

function App() {
    return (
        <MainContainer>
            <>
                <Route path={ROUTES.HOME} component={Home} />
                <Route path={ROUTES.RANDOM} component={Randomizer} />
                <Route path={ROUTES.OPTIONS} component={Options} />
            </>
        </MainContainer>
    )
}

export default App
