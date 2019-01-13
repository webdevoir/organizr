Rails.application.routes.draw do
  root "pages#root"

  resources :users
  resources :sessions, only: [:new, :create, :destroy]

  get 'sessions/new'
  get 'sessions/create'
  get 'sessions/destroy'
end
