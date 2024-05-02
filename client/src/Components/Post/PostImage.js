import React from 'react';

const PostImage = () => {
  return (
     
        <div class="py-4">
          <div class="flex justify-between gap-1 mb-1">
            <a class="flex" href="#">
              <img class="max-w-full rounded-tl-lg"
                src="https://images.pexels.com/photos/92866/pexels-photo-92866.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
            </a>
            <a class="flex" href="#">
              <img class="max-w-full"
                src="https://images.pexels.com/photos/247929/pexels-photo-247929.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
            </a>
            <a class="flex" href="#">
              <img class="max-w-full rounded-tr-lg"
                src="https://images.pexels.com/photos/631522/pexels-photo-631522.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
            </a>
          </div>
          <div class="flex justify-between gap-1">
            <a class="flex" href="#">
              <img class="max-w-full rounded-bl-lg"
                src="https://images.pexels.com/photos/1429748/pexels-photo-1429748.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
            </a>
            <a class="flex" href="#">
              <img class="max-w-full rounded-br-lg"
                src="https://images.pexels.com/photos/69020/pexels-photo-69020.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
            </a>
          </div>
        </div>
       
  );
};

export default PostImage;
