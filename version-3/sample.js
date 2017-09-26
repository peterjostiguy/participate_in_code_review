const express = require('express');
const pg = require('../db/knex');
const router = express.Router();
const Joi = require('joi');

router.post('/add', (req, res, next) => {
    Joi.validate(
        {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            bio: req.body.bio,
            portrait: req.body.portrait
        },
        schema,
        (err, value) => {
            if(err){
                res.redirect('/authors/add');
            }else if(!err){
                pg('authors').insert(
                    {
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        bio: req.body.bio,
                        portrait: req.body.portrait
                    }
                )
                .then(() => {
                    let books = formatBooks(req.body['books[]'])

                    books.forEach(book => {
                        pg('books').insert(
                            {
                                title: book,
                                genre: '',
                                description: `Please enter a description for ${book}`,
                                cover: 'https://unhabitat.org/wp-content/plugins/mybooktable/images/book-placeholder.jpg'
                            }
                        )
                        .then(() => {
                            console.log('success');
                        });
                    });

                    return books;
                })
                .then((books) => {
                    pg('authors').select('id').where(

                        {
                            'first_name': req.body.first_name,
                            'last_name': req.body.last_name
                        }
                    )
                    .then(author_id => {
                        books.forEach(book => {
                            pg('books').select('id').where('title', book)
                            .then(book_id => {

                                pg('books_authors').insert(
                                    {
                                        book_id: book_id[0].id,
                                        author_id: author_id[0].id
                                    }
                                )
                                .then(() => {
                                    res.redirect('/authors');
                                });
                            })
                        })
                    })
                });
            }
        }
    );
});
