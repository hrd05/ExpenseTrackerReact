import React, { useEffect, useState, useContext } from "react"
import axios from "axios";
import AuthContext from "./auth-context";

const ExpenseContext = React.createContext({
    expenses: [],
    addExpense: (expense) => { },
    deleteExpense: (id) => { },

})

export const ExpenseContextProvider = (props) => {
    const [expenses, setExpenses] = useState([]);
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        if (!authCtx.token) {
            return;
        }
        async function fetchExpenses() {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/expenses`, { headers: { "Authorization": authCtx.token } });
            // console.log(response);
            if (response.status === 201) {
                // console.log(response.data);
                setExpenses(response.data.expenses);
            }
        }
        fetchExpenses();
    }, [authCtx.token])

    const addExpenseHandler = (expense) => {
        setExpenses([...expenses, expense]);
    }

    const deleteExpenseHandler = async (id) => {
        console.log(id);
        try {
            const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/expense/${id}`, { headers: { "Authorization": authCtx.token } });
            if (response.status === 201) {
                const fileterdExpense = expenses.filter((expense) => expense._id !== id);
                setExpenses(fileterdExpense);
            }
        }
        catch (err) {
            console.log(err);
            alert("Error deleting expense");
        }
    }

    const expenseContext = {
        expenses: expenses,
        addExpense: addExpenseHandler,
        deleteExpense: deleteExpenseHandler
    }

    return (
        <ExpenseContext.Provider value={expenseContext} >
            {props.children}
        </ExpenseContext.Provider>
    )
}

export default ExpenseContext;