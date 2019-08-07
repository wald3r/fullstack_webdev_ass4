const listHelper = require('../utils/list_helper')



describe('most blogs', () => {
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
      const result = listHelper.mostBlogs(listWithOneBlog)
      expect(result.author).toEqual('Edsger W. Dijkstra')
      expect(result.blogs).toEqual(1)
    })
  
    test('list with three individual blogs', () => {
      const result = listHelper.mostBlogs(listWithThreeBlogs)
      expect(result.author).toEqual('Daniel Walder')
      expect(result.blogs).toEqual(1)
    })
  
    test('list with equal blogs', () => {
      const result = listHelper.mostBlogs(listWithEqualBlogs)
      expect(result.author).toEqual('Daniel Walder')
      expect(result.blogs).toEqual(2)

    })
  })

