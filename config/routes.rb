Rails.application.routes.draw do
  root "pages#root"

  post '/login', to: 'auth#login'
  post '/users/create', to: 'users#create'

end
