class ApplicationController < ActionController::API # API controllers cannot serve up HTML
    include ActionController::RequestForgeryProtection
    protect_from_forgery with: :exception # enables CSRF protection, comment out to test in postman

    before_action :snake_case_params
    before_action :attach_authenticity_token

    rescue_from StandardError, with: :unhandled_error
    rescue_from ActionController::InvalidAuthenticityToken, with: :invalid_authenticity_token

    def current_user
        @current_user ||= User.find_by(session_token: session[:session_token]) 
    end
    
    def login!(user)
        @current_user = user 
        session[:session_token] = user.reset_session_token!
    end
    
    def logout!
        current_user.reset_session_token! 
        session[:session_token] = nil
        @current_user = nil 
    end
    
    def require_logged_in
        unless logged_in?
            render json: { errors: ['Must be logged in'] }, status: 401
        end
    end

    def require_logged_out
        if logged_in?
            render json: { errors: ['Must be logged out'] }, status: 401
        end
    end

    def logged_in?
        !!current_user
    end

    private

    def snake_case_params
        params.deep_transform_keys!(&:underscore)
    end

    def attach_authenticity_token
        headers['X-CSRF-Token'] = form_authenticity_token
        # masked - for one session, form - for one cycle
    end
    
    def invalid_authenticity_token
        render json: { message: 'Invalid authenticity token' }, status: :unprocessable_entity
    end
      
    def unhandled_error(error)
      if request.accepts.first.html?
        raise error
      else
        @message = "#{error.class} - #{error.message}"
        @stack = Rails::BacktraceCleaner.new.clean(error.backtrace)
        render 'api/errors/internal_server_error', status: :internal_server_error
    
        logger.error "\n#{@message}:\n\t#{@stack.join("\n\t")}\n"

        # console.log(error.stack)
      end
    end

end

