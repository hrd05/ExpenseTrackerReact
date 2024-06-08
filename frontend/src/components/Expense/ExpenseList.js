import React, { useContext } from "react";
import { Button, Card, Table, Container } from "react-bootstrap";
import "./ExpenseList.css";
import ExpenseContext from "../../store/expense-context";


const ExpenseList = (props) => {
    const expenseCtx = useContext(ExpenseContext);

    let totalAmount = 0;
    expenseCtx.expenses.forEach((exp) => {
        totalAmount = totalAmount + Number(exp.amount);
    })

    const deleteExpense = (e) => {
        expenseCtx.deleteExpense(e.target.id);

    }

    const editExpense = (e) => {
        props.editExpense(e.target.id);
    }

    return (
        <Container className="expense-list-container">
            <Card className="mt-3 expense-card">
                <Card.Body className="bg-light">
                    <div className="table-responsive">
                        <Table striped bordered hover className="expense-table">
                            <thead>
                                <tr>
                                    <th>Expense</th>
                                    <th>Description</th>
                                    <th>Amount</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expenseCtx.expenses.map((expense, index) => (
                                    <tr key={index}>
                                        <td>{expense.category}</td>
                                        <td>{expense.description}</td>
                                        <td>{expense.amount}</td>
                                        <td>
                                            <Button id={expense._id} onClick={editExpense} variant="dark" className="mx-2" size="sm">Edit</Button>
                                            <Button id={expense._id} onClick={deleteExpense} variant="danger" size="sm">Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-beginning text-bg-secondary bg-gradient">
                    <h4>Total Spent: {totalAmount} Rs</h4>
                </Card.Footer>
            </Card>
        </Container>
    );
}

export default ExpenseList;
