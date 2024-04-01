class Api::SessionsController < ApplicationController
  # added before_action lines in class demo
  before_action :require_logged_in, only: [:destroy]
  before_action :require_logged_out, only: [:create]

  def show
    @user = current_user
    if @user
      # render json: { user: current_user }
      render 'api/users/show'
    # if you wanted to do sonething like render :show, you could also do render 'api/users/show' if there isn't a file created yet
    else
      render json: { user: nil } 
    end

  end

  def create
    @user = User.find_by_credentials(params[:email], params[:password])

    if @user 
      login!(@user)
      # render json: { user: @user }
      render 'api/users/show'
    else
      render json: { errors: ['The provided credentials were invalid.'] }, status: :unauthorized 
    end

  end

  def destroy
    if current_user
      logout!
      render json: { message: 'success' }
    end

  end
end
