import React, { useRef, useContext, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import axios from "axios";
import ExpenseList from "./ExpenseList";
import "./ExpenseForm.css";  // Import custom CSS
import AuthContext from "../../store/auth-context";
import ExpenseContext from "../../store/expense-context";


const ExpenseForm = () => {

    const url = process.env.REACT_APP_BASE_URL;
    const authCtx = useContext(AuthContext);
    const expenseCtx = useContext(ExpenseContext);

    const amountRef = useRef('');
    const descriptionRef = useRef('');
    const categoryRef = useRef('');
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState('');
    const expenseTypes = ['Food', 'Fuel', 'Shopping', 'Groceries', 'Others'];

    const editExpenseHandler = (id) => {
        // console.log(id);
        setEditId(id);
        setEditMode(true);
        const expenseDetail = expenseCtx.expenses.find((exp) => exp._id === id);
        // console.log(expenseDetail);
        amountRef.current.value = expenseDetail.amount;
        descriptionRef.current.value = expenseDetail.description;
        categoryRef.current.value = expenseDetail.category;

    }

    const submitHandler = async (event) => {
        event.preventDefault();
        const body = {
            amount: amountRef.current.value,
            description: descriptionRef.current.value,
            category: categoryRef.current.value
        }
        if (editMode) {
            const response = await axios.put(`${url}/update-expense/${editId}`, body, { headers: { "Authorization": authCtx.token } });
            if (response.status === 201) {
                console.log(response.data);
                amountRef.current.value = '';
                descriptionRef.current.value = '';
                categoryRef.current.value = 'Food';
            }
        }
        else {
            try {

                const response = await axios.post(`${url}/expense`, body, { headers: { "Authorization": authCtx.token } });
                if (response.status === 201) {
                    // console.log(response);
                    expenseCtx.addExpense(response.data);
                    amountRef.current.value = '';
                    descriptionRef.current.value = '';
                    categoryRef.current.value = 'Food';
                }
            }
            catch (err) {
                console.log(err);
                alert("Error adding expense");
            }
        }


        // Handle form submission logic
    }

    return (
        <Card className="expense-card">
            <Card.Body className="bg-light">
                <h2 className="d-flex justify-content-center mb-2">Add Your Expense</h2>
                <Form onSubmit={submitHandler} className="expense-form">
                    <Row className="mb-3">
                        <Form.Group as={Col} md={4}>
                            <Form.Control type="number" ref={amountRef} placeholder="Enter amount" />
                        </Form.Group>
                        <Form.Group as={Col} md={4}>
                            <Form.Control type="text" ref={descriptionRef} placeholder="Enter description" />
                        </Form.Group>
                        <Form.Group as={Col} md={4}>
                            <Form.Control as="select" ref={categoryRef} defaultValue="Food" name="Category" >

                                {expenseTypes.map((type, index) =>
                                    <option key={index}>{type}</option>
                                )}
                            </Form.Control>
                        </Form.Group>
                    </Row>
                    <Row className="justify-content-center" >
                        <Col xs={12} md={6} className="d-flex justify-content-center">
                            <Button type="submit" variant="primary">{!editMode ? 'Add Expense' : 'Update Expense'}</Button>
                        </Col>
                    </Row>
                </Form>
                <ExpenseList editExpense={editExpenseHandler} />
            </Card.Body>
        </Card>
    );
}

export default ExpenseForm;
