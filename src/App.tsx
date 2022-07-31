import {Flex} from "@chakra-ui/react";
import TodoContainer from "./components/TodoContainer/TodoContainer";
import BottomBar from "./components/BottomBar/BottomBar";
import AlertMessage from "./components/AlertMessage/AlertMessage";

function App() {

    return (
        <Flex w="100%" h="100vh" display="flex" align="center" justify="center">
            <AlertMessage/>
            <TodoContainer/>
            <BottomBar/>
        </Flex>
    );
}

export default App;
