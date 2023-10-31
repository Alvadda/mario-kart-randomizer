import { Route } from 'wouter'

import { MainContainer } from '@/layout/mainContainer'
import { Options, ROUTES, Randomizer } from '@/routes'

function App() {
    return (
        <MainContainer>
            <>
                <Route path={ROUTES.RANDOM} component={Randomizer} />
                <Route path={ROUTES.OPTIONS} component={Options} />
            </>
        </MainContainer>
    )
}

export default App
