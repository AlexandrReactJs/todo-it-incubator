import { screen, render } from "@testing-library/react";
import { v1 } from 'uuid';
import Todolist from "./Todolist";

let tasks1 = [
    { id: v1(), title: 'React', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'CSS', isDone: false }

  ]

describe("Todolist component", () => {
    it("Todolist renders", () => {
        render(<Todolist tasks={tasks1}/>)
    
        expect(screen.getByText("React")).toBeInTheDocument()
    })

    it("Todolist renders withoutdata", () => {
        render(<Todolist/>)

        expect(screen.queryByRole('list')).toBeNull()
    })

        it("TodoLis snapshot", () => {
            const todo = render(<Todolist tasks={tasks1}/> )
            expect(todo).toMatchSnapshot()
        })
})
