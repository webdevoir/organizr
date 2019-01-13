Rails.application.routes.draw do
  root "pages#root"
  resources :users
end
