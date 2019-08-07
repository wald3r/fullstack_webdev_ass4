const listHelper = require('../utils/list_helper')



describe('most likes', () => {
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
          author: 'Daniel Walder',
          likes: 9,
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
      const result = listHelper.mostLikes(listWithOneBlog)
      expect(result.author).toEqual('Edsger W. Dijkstra')
      expect(result.likes).toEqual(5)
    })
  
    test('list with three individual blogs', () => {
      const result = listHelper.mostLikes(listWithThreeBlogs)
      expect(result.author).toEqual('Edsger W. Dijkstra')
      expect(result.likes).toEqual(10)
    })
  
    test('list with equal blogs', () => {
      const result = listHelper.mostLikes(listWithEqualBlogs)
      expect(result.author).toEqual('Daniel Walder')
      expect(result.likes).toEqual(14)

    })
  })

