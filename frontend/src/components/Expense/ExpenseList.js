import React from "react";
import { Button, Card, Table, Container } from "react-bootstrap";
import "./ExpenseList.css";

const DUMMY_EXPENSES = [
    { name: 'Petrol', amount: '100', description: 'Petrol in car' },
    { name: 'Shopping', amount: '2500', description: 'Birthday shopping' },
    { name: 'Food', amount: '2000', description: 'Hangout with friends' },
    { name: 'Food', amount: '1000', description: 'Hangout with friends' },
    { name: 'Groceries', amount: '500', description: 'Vegetable purchase' },
    { name: 'Food', amount: '2000', description: 'Hangout with friends' },
];

const ExpenseList = () => {
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
                                {DUMMY_EXPENSES.map((expense, index) => (
                                    <tr key={index}>
                                        <td>{expense.name}</td>
                                        <td>{expense.description}</td>
                                        <td>{expense.amount}</td>
                                        <td>
                                            <Button variant="danger" size="sm">Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ExpenseList;
