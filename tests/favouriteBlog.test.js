const listHelper = require('../utils/list_helper')


describe('favourite blog', () => {
    const listWithOneBlog = [
      {
        author: 'Edsger W. Dijkstra',
        likes: 5,
      }
    ]
  
    const listWithThreeBlogs = [
      {
        author: 'Daniel Walder',
        likes: 5,
      },
      {
        author: 'Edsger W. Dijkstra',
        likes: 10,
      },
      {
        author: 'Anna',
        likes: 1,
      }
    ]

    const listWithEqualBlogs = [
        {
          author: 'Daniel Walder',
          likes: 5,
        },
        {
          author: 'Edsger W. Dijkstra',
          likes: 10,
        },
        {
          author: 'Anna',
          likes: 1,
        },
        {
            author: 'Stefan',
            likes: 10,
        }
      ]
  

  
    test('list with one blog', () => {
      const result = listHelper.favoriteBlog(listWithOneBlog)
      expect(result).toEqual(listWithOneBlog[0])
    })
  
    test('list with three blogs', () => {
      const result = listHelper.favoriteBlog(listWithThreeBlogs)
      expect(result).toEqual(listWithThreeBlogs[1])
    })
  
    test('list with equal values', () => {
      const result = listHelper.favoriteBlog(listWithEqualBlogs)
      expect(result).toEqual(listWithEqualBlogs[1])
    })
  })